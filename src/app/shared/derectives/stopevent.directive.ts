import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appStopEvent]',
  standalone: true,
})
export class StopEventDirective {
  @HostListener('click', ["$event"])
  @HostListener('keydown', ["$event"])
  @HostListener('tab', ["$event"])
  onClick(e: Event) {
    e.stopPropagation();
    e.preventDefault();

    return false;
  }

}
