// the html code for a bar of the graph

var bar = 

`<div class = "bar">
  <div class = "day"></div>
  <div class = "block"></div>
	<div class = "amount"></div>
</div>`;

// getting the width of the graph container

var graph = document.getElementsByClassName('graph')[0],
  style = window.getComputedStyle(graph),
  width = style.getPropertyValue('width');

function getWidth() {
  width = style.getPropertyValue('width');
}

// getting the json data as a JS object

const url = 'https://raw.githubusercontent.com/RoxasKH/Expenses-Chart-Component/main/data.json';

async function getData() {

  try {
    const response = await fetch(url);
    const data = await response.json();

    // getting the max value in the data array and its index as an object with 2 attributes

    var value = 0;

    for (var i = 0; i < data.length; i++) {
      if (data[i].amount > value){
        var value = data[i].amount;
        var max = {value, i};
      }
    }

    // dinamically set the width of the elements based on the width of the container
    function setBarWidth() {
      getWidth();
      for (var i = 0; i < data.length; i++) {
        document.getElementsByClassName("block")[i].style.width = (3/4)*(parseInt(width.substring(0,(width.length-2))) / data.length) + "px";
        document.getElementsByClassName("amount")[i].style.width = (parseInt(width.substring(0,(width.length-2))) / data.length - 5) + "px";
      }
    }

    window.addEventListener("resize", setBarWidth);

    // adding a bar element for every entry of the data array and setting properties to them

    for (var i = 0; i < data.length; i++) {
      // add a bar
      graph.innerHTML += bar;

      // insert value from the json data array into the elements
      document.getElementsByClassName("day")[i].innerHTML = data[i].day;
      document.getElementsByClassName("amount")[i].innerHTML = "$" + data[i].amount;

      // add some style to the day elements by adding the subtitle class to them
      document.getElementsByClassName("day")[i].classList.add("subtitle");

      // set the height of the block dinamically based on the max height (150px) through flex-basis
      document.getElementsByClassName("block")[i].style.flexBasis = (data[i].amount * 150) / max.value + "px";
    }

    for (var i = 0; i < data.length.length; i++) {
      // adding an empty touchevent on blocks to trigger the :active pseudostate on mobile Safari
      // this is done in a separate loop because Element.innerHTML property completely rewrites the HTML and all event handlers would be lost
      document.getElementsByClassName("block")[i].addEventListener("touchstart", function() {}, false);
    }

    // dinamically set the width of the elements based on the width of the container
    setBarWidth();

    // change the color of the block with the max value
    document.getElementsByClassName("block")[max.i].style.backgroundColor = "#76B5BC";

  }
  catch (error) {
    console.error('Something went wrong with retrieving data');
    console.error(error);
  }

}

getData();