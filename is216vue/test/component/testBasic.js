describe('New Arrivals Component Test', function() {

    let component;
  
    before(async () => {
      component = await browser.mountVueComponent('/src/App.vue', {
        plugins: {
          router: '/src/route/routes.js'
        },
  
        
      })
    });
  
  });
  