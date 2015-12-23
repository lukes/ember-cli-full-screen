import Em from 'ember';

export default Em.Mixin.create(Em.Evented, {

  fullscreen: false,

  requestFullscreen: Em.on('didEnterFullscreen', function() {
    var el = this.get('element');

    if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if (el.msRequestFullscreen) {
      el.msRequestFullscreen();
    } else if (el.mozRequestFullScreen) {
      el.mozRequestFullScreen();
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    }
  }),

  exitFullscreen: Em.on('didExitFullscreen', function() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }),

  applyKeyBindings: Em.on('didEnterFullscreen', function() {
    Em.$('body').on('keyup.fullScreenMixin', (e) => {
      if(e.which === 27) { // Esc
        this.send('exitFullscreen');
      }
    });
  }),

  removeKeyBindings: Em.on('didExitFullscreen', function() {
    Em.$('body').off('keyup.fullScreenMixin');
  }),

  actions: {

    enterFullscreen: function() {
      this.set('fullscreen', true);
      this.trigger('didEnterFullscreen');
    },

    exitFullscreen: function() {
      this.set('fullscreen', false);
      this.trigger('didExitFullscreen');
    },

    toggleFullscreen: function() {
      if (this.get('fullscreen')) {
        this.send('exitFullscreen');
      } else {
        this.send('enterFullscreen');
      }
    },

    // Alias actions:

    enterFullScreen: function() {
      this.send('enterFullscreen');
    },

    exitFullScreen: function() {
      this.send('exitFullscreen');
    },

    toggleFullScreen: function() {
      this.send('toggleFullscreen');
    },

  }

});
