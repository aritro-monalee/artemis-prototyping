const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1920, height: 1080 }
  });
  
  const page = await browser.newPage();
  
  console.log('Navigating to http://localhost:3001...');
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle2' });
  
  // Wait a bit for any animations to settle
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Take initial screenshot
  console.log('Taking initial screenshot...');
  await page.screenshot({ path: 'screenshot-initial.png', fullPage: true });
  console.log('Initial screenshot saved as screenshot-initial.png');
  
  // Check for elements
  console.log('\n=== PAGE ANALYSIS ===');
  
  // Check for cream-colored column containers
  const columns = await page.evaluate(() => {
    const cols = Array.from(document.querySelectorAll('[class*="column"], [class*="Column"], [data-column], .rounded'));
    return cols.map(col => ({
      tag: col.tagName,
      classes: col.className,
      hasRoundedClass: col.className.includes('rounded'),
      backgroundColor: window.getComputedStyle(col).backgroundColor,
      borderRadius: window.getComputedStyle(col).borderRadius
    }));
  });
  console.log('Column containers found:', columns.length);
  console.log('Column details:', JSON.stringify(columns, null, 2));
  
  // Check for cards
  const cards = await page.evaluate(() => {
    const cardElements = Array.from(document.querySelectorAll('[class*="card"], [class*="Card"], [draggable="true"]'));
    return cardElements.map(card => ({
      tag: card.tagName,
      classes: card.className,
      draggable: card.draggable,
      text: card.textContent.substring(0, 50)
    }));
  });
  console.log('Cards found:', cards.length);
  console.log('Card details:', JSON.stringify(cards, null, 2));
  
  // Check for purple "Create Project" button
  const createButton = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const createBtn = buttons.find(btn => btn.textContent.includes('Create Project'));
    if (createBtn) {
      return {
        text: createBtn.textContent,
        backgroundColor: window.getComputedStyle(createBtn).backgroundColor,
        color: window.getComputedStyle(createBtn).color,
        classes: createBtn.className
      };
    }
    return null;
  });
  console.log('Create Project button:', JSON.stringify(createButton, null, 2));
  
  // Check for sidebar
  const sidebar = await page.evaluate(() => {
    const sidebars = Array.from(document.querySelectorAll('[class*="sidebar"], [class*="Sidebar"], aside, nav'));
    return sidebars.map(sb => ({
      tag: sb.tagName,
      classes: sb.className,
      width: window.getComputedStyle(sb).width
    }));
  });
  console.log('Sidebar elements found:', sidebar.length);
  console.log('Sidebar details:', JSON.stringify(sidebar, null, 2));
  
  // Try to find and drag a card
  console.log('\n=== TESTING DRAG AND DROP ===');
  
  const dragResult = await page.evaluate(() => {
    // Find first draggable card
    const draggableCard = document.querySelector('[draggable="true"]');
    if (!draggableCard) {
      return { success: false, message: 'No draggable card found' };
    }
    
    // Get card position
    const cardRect = draggableCard.getBoundingClientRect();
    
    // Find all columns/drop zones
    const dropZones = Array.from(document.querySelectorAll('[data-column], [class*="column"], [class*="Column"]'));
    if (dropZones.length < 2) {
      return { success: false, message: 'Not enough drop zones found' };
    }
    
    // Get the second column's position
    const targetColumn = dropZones[1];
    const targetRect = targetColumn.getBoundingClientRect();
    
    return {
      success: true,
      cardPosition: { x: cardRect.x, y: cardRect.y, width: cardRect.width, height: cardRect.height },
      targetPosition: { x: targetRect.x, y: targetRect.y, width: targetRect.width, height: targetRect.height },
      cardText: draggableCard.textContent.substring(0, 30)
    };
  });
  
  console.log('Drag setup:', JSON.stringify(dragResult, null, 2));
  
  if (dragResult.success) {
    // Perform the drag
    const startX = dragResult.cardPosition.x + dragResult.cardPosition.width / 2;
    const startY = dragResult.cardPosition.y + dragResult.cardPosition.height / 2;
    const endX = dragResult.targetPosition.x + dragResult.targetPosition.width / 2;
    const endY = dragResult.targetPosition.y + 100; // Drop near top of target column
    
    console.log(`Dragging from (${startX}, ${startY}) to (${endX}, ${endY})`);
    
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Take screenshot during drag
    await page.mouse.move(endX, endY, { steps: 10 });
    await new Promise(resolve => setTimeout(resolve, 300));
    console.log('Taking screenshot during drag...');
    await page.screenshot({ path: 'screenshot-dragging.png', fullPage: true });
    console.log('Drag screenshot saved as screenshot-dragging.png');
    
    // Drop
    await page.mouse.up();
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Take final screenshot
    console.log('Taking final screenshot after drop...');
    await page.screenshot({ path: 'screenshot-after-drop.png', fullPage: true });
    console.log('Final screenshot saved as screenshot-after-drop.png');
  } else {
    console.log('Could not perform drag:', dragResult.message);
  }
  
  console.log('\n=== TEST COMPLETE ===');
  console.log('Screenshots saved in current directory');
  
  await browser.close();
})();
