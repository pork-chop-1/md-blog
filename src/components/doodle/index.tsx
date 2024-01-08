'use client'

let added = false

export default function ({ rule = '' }) {
  if(!added && typeof document !== 'undefined') {
    added = true
    const script = document.createElement("script");
		script.src = "https://cdnjs.cloudflare.com/ajax/libs/css-doodle/0.38.1/css-doodle.min.js";
		document.body.appendChild(script);
  }

  return <css-doodle click-to-update>{rule}</css-doodle>
}
