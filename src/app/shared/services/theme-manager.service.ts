import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2 } from '@angular/core';
import { Theme, THEME_CONFIG } from '@shared/enum/theme.enum';

@Injectable({
  providedIn: 'root'
})
export class ThemeManagerService {

  secondTheme = false;

  constructor(private renderer: Renderer2, @Inject(DOCUMENT) private document: Document) {}

  toggleTheme() {
    if (this.secondTheme) {
      this.removeLink(THEME_CONFIG[Theme.SECOND_THEME].href);
      this.document.body.classList.remove(THEME_CONFIG[Theme.SECOND_THEME].class);
      this.secondTheme = false;
    } else {
      this.getLinkElementForKey(THEME_CONFIG[Theme.SECOND_THEME].href);
      this.document.body.classList.add(THEME_CONFIG[Theme.SECOND_THEME].class);
      this.secondTheme = true;
    }
  }

  removeLink(key: string) {
    if (this.getExistingLinkElementByKey(key)) {
      const childTheme = this.document.head.querySelector(`link[rel="stylesheet"][href="${key}"]`);
      this.renderer.removeChild(this.renderer.parentNode, childTheme);
    }
  }

  getLinkElementForKey(key: string) {
    return this.getExistingLinkElementByKey(key) || this.createLinkElementWithKey(key);
  }

  getExistingLinkElementByKey(key: string) {
    return !!this.document.head.querySelectorAll(`link[rel="stylesheet"][href="${key}"]`).length;
  }
  
  createLinkElementWithKey(key: string) {
    const linkEl: HTMLLinkElement = this.document.createElement('link');
    linkEl.setAttribute('rel', 'stylesheet');
    linkEl.setAttribute('type', 'text/css');
    linkEl.setAttribute('href', THEME_CONFIG[Theme.SECOND_THEME].href);
    this.document.head.appendChild(linkEl);
    return linkEl;
  }
}
