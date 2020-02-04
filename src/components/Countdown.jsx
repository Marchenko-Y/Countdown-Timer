import React from "react";

const copyToClipBoard = str => {
  const el = document.createElement("textarea");
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: "New year",
      eventDate: "2021-01-01",
      days: undefined,
      hours: undefined,
      minutes: undefined,
      seconds: undefined
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  calculateTimeToEvent(eventDate) {
    const difference = new Date(eventDate) - new Date();
    if (difference > 0) {
      this.setState({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    } else {
      this.setState({
        days: "D",
        hours: "O",
        minutes: "N",
        seconds: "E"
      });
    }
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const event = urlParams.get("event");
    const date = urlParams.get("eventDate");
    if (event && date) {
      this.setState({
        event,
        eventDate: date
      });
    }

    this.timer = setInterval(() => {
      this.calculateTimeToEvent(this.state.eventDate);
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  handleSubmit(e) {
    this.setState({
      event: e.target.elements.event.value,
      eventDate: e.target.elements.eventDate.value
    });
    e.preventDefault();
  }
  handleCopyClick = e => {
    e.preventDefault();
    const currentLink = window.location.origin;
    copyToClipBoard(
      `${currentLink}?event=${this.state.event}&eventDate=${this.state.eventDate}`
    );
  };
  render() {
    const { event, days, hours, minutes, seconds } = this.state;
    return (
      <div className="wrapper">
        <div className="container">
          <form onSubmit={this.handleSubmit} className="countdown-form">
            <label>
              Event:
              <input type="text" name="event" className="event" />
            </label>

            <label>
              Date:
              <input type="date" name="eventDate" className="eventDate" />
            </label>
            <input type="submit" value="go" />
          </form>

          <h1 className="eventTitle">
            Left before <span>the {event}</span>:
          </h1>
          <div className="countdown-container">
            <div className="countdown-item">
              <div className="countdown-timer">{days}</div>
              {days === 1 ? <span>day</span> : <span>days</span>}
            </div>
            <div className="countdown-item">
              <div className="countdown-timer">{hours}</div>
              {hours === 1 ? <span>hour</span> : <span>hours</span>}
            </div>
            <div className="countdown-item">
              <div className="countdown-timer">{minutes}</div>
              {minutes === 1 ? <span>minute</span> : <span>minutes</span>}
            </div>
            <div className="countdown-item">
              <div className="countdown-timer">{seconds}</div>
              {seconds === 1 ? <span>second</span> : <span>seconds</span>}
            </div>
          </div>

          <a href="" onClick={this.handleCopyClick}>
            Copy link
          </a>
        </div>
      </div>
    );
  }
}

export default Countdown;
