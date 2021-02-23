console.log('client js loaded');

function decreaseSKU(target_sku) {
  console.log('decreasing', target_sku, 'by one');
  fetch('/decrease', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ sku: target_sku })
  });

}
