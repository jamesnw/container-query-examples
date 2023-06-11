// For each container, finds any elements with "style" class and applies its content to the container.
// This allows us to display the text of the style without duplicating it in css.
const containers = document.querySelectorAll('.container');

Array.from(containers).forEach(container=>{
    const styleEl = container.getElementsByClassName('style')?.[0];
    if(styleEl){
        container.setAttribute('style', styleEl.innerText);
    }
})

const examples = document.querySelectorAll('.example');

const exampleInfo = Array.from(examples).map(example=>{
    return {
        name: example.querySelector('h2').innerText,
        id: example.getAttribute('id')
    }
});
const toc = document.getElementById('toc');
exampleInfo.forEach(example=>{
    const anchor = document.createElement('a');
    anchor.href = `#${example.id}`;
    anchor.innerText = example.name;
    anchor.dataset.name = example.id;
    const li = document.createElement('li');
    li.append(anchor)
    
    toc.append(li)
});

