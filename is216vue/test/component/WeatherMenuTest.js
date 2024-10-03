describe('Weather Menu Component Test', function() {

    it('checks if the component has been mounted', async (browser) => {
      const component = await browser.mountVueComponent('../../src/components/WeatherMenu.vue', {
        plugins: {
          router: '../../src/route/routes.js'
        }
      });

    //   const component = await browser.mountVueComponent('../../../src/components/Form.vue', {
    //     plugins: {
    //       store: '../../../src/lib/store.js',
    //       router: '../../../src/lib/router.js'
    //     },
        
      
      expect(component).to.be.present; 
    });
  });