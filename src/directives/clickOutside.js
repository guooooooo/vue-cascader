/* eslint-disable no-param-reassign */

export default {
  clickOutside: {
    inserted(el, bindings) {
      el.listener = (e) => {
        if (e.target === el || el.contains(e.target)) {
          return;
        }
        bindings.value();
      };
      document.addEventListener('click', el.listener);
    },
    unbind(el) {
      document.removeEventListener('click', el.listener);
    },
  },
};
