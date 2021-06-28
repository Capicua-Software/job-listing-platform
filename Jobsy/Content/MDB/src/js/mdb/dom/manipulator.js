/**
 * --------------------------------------------------------------------------
 * Bootstrap (v5.0.0-alpha1): dom/manipulator.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

function normalizeData(val) {
  if (val === 'true') {
    return true;
  }

  if (val === 'false') {
    return false;
  }

  if (val === Number(val).toString()) {
    return Number(val);
  }

  if (val === '' || val === 'null') {
    return null;
  }

  return val;
}

function normalizeDataKey(key) {
  return key.replace(/[A-Z]/g, (chr) => `-${chr.toLowerCase()}`);
}

const Manipulator = {
  setDataAttribute(element, key, value) {
    element.setAttribute(`data-${normalizeDataKey(key)}`, value);
  },

  removeDataAttribute(element, key) {
    element.removeAttribute(`data-${normalizeDataKey(key)}`);
  },

  getDataAttributes(element) {
    if (!element) {
      return {};
    }

    const attributes = {
      ...element.dataset,
    };

    Object.keys(attributes).forEach((key) => {
      attributes[key] = normalizeData(attributes[key]);
    });

    return attributes;
  },

  getDataAttribute(element, key) {
    return normalizeData(element.getAttribute(`data-${normalizeDataKey(key)}`));
  },

  offset(element) {
    const rect = element.getBoundingClientRect();

    return {
      top: rect.top + document.body.scrollTop,
      left: rect.left + document.body.scrollLeft,
    };
  },

  position(element) {
    return {
      top: element.offsetTop,
      left: element.offsetLeft,
    };
  },

  style(element, style) {
    Object.assign(element.style, style);
  },

  toggleClass(element, className) {
    if (!element) {
      return;
    }

    if (element.classList.contains(className)) {
      element.classList.remove(className);
    } else {
      element.classList.add(className);
    }
  },

  addClass(element, className) {
    if (element.classList.contains(className)) return;
    element.classList.add(className);
  },

  addStyle(element, style) {
    Object.keys(style).forEach((property) => {
      element.style[property] = style[property];
    });
  },

  removeClass(element, className) {
    if (!element.classList.contains(className)) return;
    element.classList.remove(className);
  },

  hasClass(element, className) {
    return element.classList.contains(className);
  },
};

export default Manipulator;