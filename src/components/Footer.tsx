import React, { Component } from "react";

export default class Footer extends Component {
  // Footer to display attributions
  render() {
    return (
      <footer className="Footer">
        <p>
          Icons made by{" "}
          <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
            Freepik
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            {" "}
            www.flaticon.com
          </a>
        </p>
        <p>
          Icons made by{" "}
          <a
            href="https://www.flaticon.com/authors/photo3idea-studio"
            title="photo3idea_studio"
          >
            photo3idea_studio
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            {" "}
            www.flaticon.com
          </a>
        </p>
        <p>
          Icons made by{" "}
          <a href="https://www.flaticon.com/authors/turkkub" title="turkkub">
            turkkub
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            {" "}
            www.flaticon.com
          </a>
        </p>
      </footer>
    );
  }
}
