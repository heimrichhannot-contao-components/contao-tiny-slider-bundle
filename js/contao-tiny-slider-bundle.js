import {tns} from 'tiny-slider';

window.tns = !window.tns ? tns : window.tns;

class TinySliderBundle {
    constructor(selector, forceInit) {
        document.querySelectorAll(selector).forEach(element => {
            TinySliderBundle.init(element, forceInit);
        });
    }

    static init(element, forceInit) {
        let container = element.querySelector('.tiny-slider-container'),
            config = JSON.parse(container.getAttribute('data-tiny-slider-config'));

        if (config.skipInit && (typeof forceInit === 'undefined' || !forceInit))
        {
            return;
        }

        config.container = element.querySelector(config.container);

        let onInit = config.onInit;

        config.onInit = function (e) {
            element.classList.add('tiny-slider-initialized');

            if(onInit){
                let onInitFunction = new Function(onInit + '()');
                onInitFunction();
            }
        };

        let slider = window.tns(config),
            sliderControls = element.querySelector('.tns-controls');


        if(sliderControls){
            sliderControls.removeAttribute('tabindex'); // accessibility fix, control div should not have an tabindex=0
        }

        TinySliderBundle.sliders.push(slider);
    }

    static getSliders() {
        return TinySliderBundle.sliders;
    }
}

TinySliderBundle.sliders = [];

document.addEventListener('DOMContentLoaded', function () {
    new TinySliderBundle('.tiny-slider');
});

window.TinySliderBundle = TinySliderBundle;

export default TinySliderBundle;