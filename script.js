// the html code for a bar of the graph

var bar = 

`<div class = "bar">
	<div class = "amount"></div>
	<div class = "block"></div>
	<div class = "day"></div>
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

      // add some style to the elements
      document.getElementsByClassName("bar")[i].style.display = "inline-block";
      document.getElementsByClassName("day")[i].classList.add("subtitle");
      document.getElementsByClassName("day")[i].style.fontSize = "14px";

      // set the height of the block dinamically based on the max height
      document.getElementsByClassName("block")[i].style.height = (data[i].amount * 150) / max.value + "px";
      
    }

    //dinamically set the width of the elements based on the width of the container
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