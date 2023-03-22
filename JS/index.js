import { clickAnimation } from "./UI/keyboard/buttonClickAnimation.js"
import { handleClick } from "./UI/keyboard/input.js"


const calc = document.querySelector(".calculator")

calc.addEventListener("click", (ev) => {
	if (ev.target.tagName !== "BUTTON") return
	clickAnimation(ev)
	handleClick(ev)
})

console.log(
	`
	%c 
Copy to the console for checking:
%c2*(2 - (3 + 7))^2 => 2 * Math.pow((2-(3+7)), 2) === 128
2^(-1/2) => Math.pow(2, (-1/2)) === 0.7071...
0.2-(-0.9) => 0.2 - (-0.9) === 1.1`,


	"font-weight: bold; " +
	"font-size: 14px;" +
	"color: #DD6969; ",

	"font-size: 14px;" +
	"color: #DD6969; " +
	"background-color: #262626;" +
	"padding: .5rem;" +
	"margin: .5rem;" +
	"border-radius: 10px;"+
	"border: solid 1px #000;"
)
