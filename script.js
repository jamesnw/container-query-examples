// For each container, finds any elements with "style" class and applies its content to the container.
// This allows us to display the text of the style without duplicating it in css.
const containers = document.querySelectorAll('.container');

Array.from(containers).forEach(container => {
    const styleEl = container.getElementsByClassName('style')?.[0];
    if (styleEl) {
        container.setAttribute('style', styleEl.innerText);
    }
})

const examples = document.querySelectorAll('.example');

const exampleInfo = Array.from(examples).map(example => {
    return {
        name: example.querySelector('span.query').innerText,
        id: example.getAttribute('id'),
        type: example.querySelector('span.type').innerText
    }
});
const toc = document.getElementById('toc');
exampleInfo.forEach(example => {
    const anchor = document.createElement('a');
    anchor.href = `#${example.id}`;
    anchor.innerText = example.name;
    anchor.dataset.name = example.id;
    const li = document.createElement('li');
    li.append(anchor)
    toc.append(li)
});

const radio = document.getElementById('radio');
exampleInfo.forEach((example, index) => {
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'query';
    input.value = example.id;
    input.id = 'radio' + example.id;
    if (index === 0) input.checked = 'checked';
    const label = document.createElement('label');
    label.setAttribute('for', 'radio' + example.id);
    label.innerText = example.name;

    radio.append(input);
    radio.append(label);
    radio.append(document.createElement('br'));
});

const styleElement = document.createElement('style');
document.head.appendChild(styleElement);
const { sheet } = styleElement;

let containerStyles = '';
exampleInfo.forEach(({ name, id, type }) => {
    containerStyles = containerStyles + `
#${id} .container{
    container: ex${id} / ${type};
}
@container ex${id} (${name}){
    *{
        color: var(--target-color);
    }
}
@container toc (${name}){
    a[data-name='${id}'] {
        color: var(--target-color);
        background: var(--accent-vibrant);
    }
}
@container radio (${name}){
    #radio-wrapper:has([value='${id}']:checked) #yes{
        display: block;
    }
    #radio-wrapper:has([value='${id}']:checked) #no{
        display: none;
    }
}
    `
})

styleElement.innerHTML = containerStyles;