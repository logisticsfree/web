import {
    Component,
    OnInit,
    Input,
    HostListener,
    ElementRef
} from "@angular/core";
import {
    transition,
    style,
    animate,
    trigger,
    keyframes
} from "@angular/animations";

@Component({
    selector: "app-driver-card",
    templateUrl: "./driver-card.component.html",
    styleUrls: ["./driver-card.component.scss"],
    animations: [
        trigger("grow", [
            transition(":enter", [
                style({ transform: "scale(.9)", opacity: 0 }),
                animate(
                    "125ms",
                    keyframes([
                        style({ transform: "scale(0.9)", offset: 0 }),
                        style({ opacity: 0.5, offset: 0.5 }),
                        style({ transform: "scale(1)", opacity: 1, offset: 1 })
                    ])
                )
            ]),
            transition(":leave", [
                style({ transform: "scale(.9)", opacity: 0 }),
                animate(
                    "175ms",
                    keyframes([
                        style({ transform: "scale(1)", opacity: 1, offset: 0 }),
                        style({ opacity: 0.5, offset: 0.5 }),
                        style({
                            transform: "scale(0.9)",
                            opacity: 0,
                            offset: 1
                        })
                    ])
                )
            ])
        ])
    ]
})
export class DriverCardComponent implements OnInit {
    @Input() truck: any;
    showCard: boolean = false;

    @HostListener("document:click", ["$event"])
    clickout(event) {
        if (this.eRef.nativeElement.contains(event.target)) {
            // this.text = "clicked inside";
            this.showCard = true;
        } else {
            // this.text = "clicked outside";
            this.showCard = false;
        }
    }
    constructor(private eRef: ElementRef) {}

    ngOnInit() {}

    toggleCard() {
        this.showCard = this.showCard ? false : true;
    }
}
