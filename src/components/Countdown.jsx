import React from "react";

class Countdown extends React.Component {
  state = {
    event: "New year",
    eventDate: "2021-01-01",
    days: undefined,
    hours: undefined,
    minutes: undefined,
    seconds: undefined
  };

  calculateTimeToEvent(eventDate) {
    const difference = new Date(eventDate) - new Date();
    if (difference > 0) {
      this.setState({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    }
  }

  componentDidMount() {
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
  render() {
    const { event, days, hours, minutes, seconds } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Event:
            <input type="text" name="event" />
          </label>

          <label>
            Date:
            <input type="date" name="eventDate" />
          </label>
          <input type="submit" value="go" />
        </form>

        <h1>Left before the {event}:</h1>
        <div className="countdown-container">
          <div className="countdown-item">
            <div className="countdown-timer">{days}</div>
            <span>days</span>
          </div>
          <div className="countdown-item">
            <div className="countdown-timer">{hours}</div>
            <span>hours</span>
          </div>
          <div className="countdown-item">
            <div className="countdown-timer">{minutes}</div>

            <span>minutes</span>
          </div>
          <div className="countdown-item">
            <div className="countdown-timer">{seconds}</div>
            <span>seconds</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Countdown;
