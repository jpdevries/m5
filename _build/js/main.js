let hidePageComponents = true;

document.querySelector('html').classList.remove('no-js');
document.querySelector('html').classList.add('js');

//document.querySelector('html').setAttribute('complex-layout', true);

//document.querySelector('html').setAttribute('contrast', 'white-on-black');
//document.querySelector('html').setAttribute('contrast', 'black-on-white');
//document.querySelector('html').removeAttribute('contrast');

//document.body.classList.add('searching');
document.body.classList.add('snappy');

const radios = document.querySelectorAll('input[type="radio"]');
for(let i = 0; i < radios.length; i++) {
  const radio = radios[i];
  radio.addEventListener('change', function(event) {
    hidePageComponents = event.target.value ==1 ? true : false;
    //doFilterPageComponents(hidePageComponents);
    (hidePageComponents) ? document.querySelector('html').classList.add('hide-unmatched-elements') :  document.querySelector('html').classList.remove('hide-unmatched-elements') ;
  });
}

document.getElementById('ubersearch').addEventListener('input', function(event) {
  if(event.target.value) event.target.classList.add('dirty');
  if(hidePageComponents) {
    doFilterPageComponents(event.target.value);
  }
});

function mainNavDetailsOpen(open = true) {
  const details = document.querySelectorAll('#mainnav__nav > details');
  for(let i = 0; i < details.length; i++) {
    const detail = details[i];
    (open) ? detail.setAttribute('open',true) : detail.removeAttribute('open');
  }
}

document.getElementById('ubersearch').addEventListener('focus', function(event) {
  if(event.target.value) event.target.classList.add('dirty');
  document.body.classList.add('searching');
  mainNavDetailsOpen(true);
});

document.getElementById('ubersearch').addEventListener('blur', function(event) {
  if(!event.target.value) event.target.classList.remove('dirty');
  //document.body.classList.remove('searching');
  //mainNavDetailsOpen(false);
});

function doFilterPageComponents(filter) {
  filter = filter.trim().toLowerCase();

  const filterWords = filter.split(' ');

  const pageComponents = document.querySelectorAll('#mainnav__nav li');
  for(let i = 0; i < pageComponents.length; i++) {
    const pageComponent = pageComponents[i];

    let match = (function(){
      let found = false;

      for(let i = 0; i < filterWords.length; i++) {
        const filterWord = filterWords[i];

        try {
          if(
            pageComponent.querySelector('h3 > a').innerHTML.toLowerCase().includes(filterWord) ||
            pageComponent.querySelector('p').innerHTML.toLowerCase().includes(filterWord)
          )  {
          //console.log('match');
          return true;
          }
        } catch(e) { }

      }

      return found;
    })();

    if(!match && filter) {
        pageComponent.setAttribute('hidden','true');
        pageComponent.setAttribute('aria-hidden','true');
      } else {
      pageComponent.removeAttribute('hidden');
      pageComponent.removeAttribute('aria-hidden');
    }
  }
}

/*
const ubersearch = document.querySelector('#ubersearch');
ubersearch.addEventListener('blur', (event) => {
  console.log(event);
});

ubersearch.addEventListener('focus', (event) => {
  console.log(event);
});
*/
