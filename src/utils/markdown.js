import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/default.css";

export default function MarkdownData(content) {
  marked.setOptions({
    renderer: marked.Renderer(),
    highlight: function (content) {
      return hljs.highlightAuto(content).value;
    },
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    xhtml: false,
  });
  return marked(content);
}
