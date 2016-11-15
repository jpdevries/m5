let hidePageComponents = true;

document.querySelector('html').classList.remove('no-js');
document.querySelector('html').classList.add('js');

//document.querySelector('html').setAttribute('complex-layout', true);

//document.querySelector('html').setAttribute('contrast', 'white-on-black');
//document.querySelector('html').setAttribute('contrast', 'black-on-white');
//document.querySelector('html').removeAttribute('contrast');

//document.body.classList.add('searching');
//document.body.classList.add('snappy');

const radios = document.querySelectorAll('input[type="radio"]');
for(let i = 0; i < radios.length; i++) {
  const radio = radios[i];
  radio.addEventListener('change', function(event) {
    hidePageComponents = event.target.value ==1 ? true : false;
    //doFilterPageComponents(hidePageComponents);
    (hidePageComponents) ? document.querySelector('html').classList.add('hide-unmatched-elements') :  document.querySelector('html').classList.remove('hide-unmatched-elements') ;
  });
}

(function(){
  const viewBtns = document.querySelectorAll('.actionnav .view');
  for(let i = 0; i < viewBtns.length; i++) {
    const viewBtn = viewBtns[i];
    const iframe = document.getElementById('preview').querySelector('iframe');
    viewBtn.addEventListener('click', function(event) {
      event.preventDefault();
      (document.body.dataset.previewing) = (document.body.dataset.previewing == 'true') ? 'false' : 'true';
      if(!iframe.getAttribute('src')) iframe.setAttribute('src', iframe.getAttribute('data-src'));
    });
  }
})();

(function(){
  const dataGrids = document.querySelectorAll('table.data-grid');
  for(let i = 0; i < dataGrids.length; i++) {
    const dataGrid = dataGrids[i];
    const trs = dataGrid.querySelectorAll('tbody > tr');

    for(let i = 0; i < trs.length; i++) {
      trs[i].addEventListener('focus', function(event) {
        console.log(event);
        closeModals();
        event.target.nextElementSibling.removeAttribute('hidden');
      });
    }
    function closeModals() {
      const modals = dataGrid.querySelectorAll('tbody > tr > td[colspan]');
      console.log('modals',modals);
      for(let i = 0; i < modals.length; i++) {
        modals[i].parentNode.setAttribute('hidden', 'true');
      }
    }
  }
})();

(function(){
  function expandCollapseAllDetails(open = true) {
    const details = document.querySelectorAll('details');
    for(let i = 0; i < details.length; i++) (open) ? details[i].setAttribute('open','true') : details[i].removeAttribute('open');
  }
  document.addEventListener("keydown", function(event) {
    console.log(event, event.key.toLowerCase())
    switch(event.key.toLowerCase()) {
      case 'arrowdown':
      if(event.ctrlKey && event.altKey && event.shiftKey) {
        document.body.classList.add('searching');
        expandCollapseAllDetails(true);
      }

      break;

      case 'arrowup':
      if(event.ctrlKey && event.altKey && event.shiftKey) {
        document.body.classList.remove('searching');
        expandCollapseAllDetails(false);
      }
      break;

      case 'escape':
      document.body.classList.remove('searching');
      mainNavDetailsOpen(false);
      break;

      case '|':
      let html = document.querySelector('html');
      if(event.ctrlKey) {
        html.setAttribute('data-tree-open', html.getAttribute('data-tree-open') == 'true' ? 'false' : 'true');
      }
    }
  });
})();

document.getElementById('jumplink').outerHTML = `
<label for="jumpto" visually-hidden>Jump to a section of hte page</label>
<select name="jumpto" id="jumpto">
  <option value="" aria-label="Choose a section to scroll to">Scroll to&hellip;</option>
  <optgroup label="Content">
    <option value="#content">Content</option>
    <option value="#document">Document</option>
    <option value="#resources">Resources</option>
    <option value="#resource-groups">Resource Groups</option>
    <option value="#settings">Settings</option>
  </optgroup>
  <optgroup label="Code">
    <option value="#elements">Elements</option>
    <option value="#template-variables">Template Variables</option>
  </optgroup>
  <optgroup label="Navigation">
    <option value="#mainnav__nav" data-above-sticky-bar="true">Main Navigation</option>
  </optgroup>
</select>
`;

document.getElementById('jumpto').addEventListener('change', function(event) {
  /*document.querySelector(event.target.value).scrollIntoView({ // works but sticky bar covers up what we scroll to :/
    behavior: 'smooth'
  });*/

  console.log(event.target.value);

  if(!event.target.value) return;

  //https://davidwalsh.name/element-matches-selector

  if(document.querySelector(event.target.value).matches('details')) {
    document.querySelector(event.target.value).setAttribute('open', true);
  }

  let offset = 0;
  if(event.target.querySelector(`option[value="${event.target.value}"]`).dataset.aboveStickyBar !== "true") {
    offset = document.getElementById('stickybar').offsetHeight + 4;
  }

  console.log(document.querySelector(event.target.value).getBoundingClientRect());
  window.scrollBy({
    top: document.querySelector(event.target.value).getBoundingClientRect().top - offset,
    //left: 0,
    behavior: 'smooth'
  });
});

(function(){
  const closeNavs = document.querySelectorAll('.sidenav > footer a, .close-nav');
  for(let i = 0; i < closeNavs.length; i++) {
    closeNavs[i].addEventListener('click', function(event) {
      event.preventDefault();
      document.body.classList.remove('searching');
      mainNavDetailsOpen(false);
    });
  }
})();


(function(){
  let stickyComponents = document.querySelectorAll('.sticky-scroll');
  for(let i = 0; i < stickyComponents.length; i++) {
    stickyComponents[i].querySelector('input[name*="snap-scroll"]').addEventListener('change', function(event) {
      event.target.checked ? document.body.classList.add('snappy') : document.body.classList.remove('snappy')
      let stickyBoxes = document.querySelectorAll('input[name*="snap-scroll"]');
      for(let i = 0; i < stickyBoxes.length; i++) stickyBoxes[i].checked = event.target.checked;
    });
  }
})();

(function(){
  let emojis = document.querySelectorAll('span[emoji],span.emoji');
  for(let i = 0; i < emojis.length; i++) {


    let emoji = emojis[i],
    props = {
      iconset: emoji.getAttribute('data-iconset'),
      icon: emoji.getAttribute('data-icon'),
      svgClass: emoji.getAttribute('data-svg-class'),
      svgTitle: emoji.getAttribute('data-svg-title')
    },
    sprite = undefined;

    (function(){
      //console.log(emoji);
      //console.log(props);

      if(!props.icon) return;

      if(!sprite) {
        switch(props.iconset) {
          case 'svgawesome':
          sprite = 'assets/img/icons.svg';
          break;
        }
      }

      let svgClass = (props.svgClass) ? ` class="${props.svgClass}"` : undefined,
      xlinkHref = `${sprite}#${props.icon}`,
      html = `<svg${svgClass}>
        <use xlink:href="${xlinkHref}"></use>
      </svg>`;

      emoji.outerHTML = html;
    })();

  }
})();

document.getElementById('pagetitle').addEventListener('input', function(event) {
  document.querySelector('#grail > main > form > header > h1').innerHTML = event.target.value || '&nbsp;';
  document.querySelector('html > head > title').innerHTML = `Editing ${event.target.value}`;
});

document.getElementById('uber').addEventListener('input', function(event) {
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

document.getElementById('uber').addEventListener('focus', function(event) {
  if(event.target.value) event.target.classList.add('dirty');
  document.body.classList.add('searching');
  mainNavDetailsOpen(true);
});

document.getElementById('uber').addEventListener('blur', function(event) {
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
const uber = document.querySelector('#uber');
uber.addEventListener('blur', (event) => {
  console.log(event);
});

uber.addEventListener('focus', (event) => {
  console.log(event);
});
*/
