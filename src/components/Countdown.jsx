import React from "react";

class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: "Hello everyone!",
      date: "2020-01-31",
      days: undefined,
      hours: undefined,
      minutes: undefined,
      seconds: undefined
    };
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
    }
  }
  componentDidMount() {
    this.timer = setInterval(() => {
      this.calculateTimeToEvent(this.state.date);
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    const { event, days, hours, minutes, seconds } = this.state;
    return (
      <div>
        <h1>Таймер</h1>
        <span>Event:</span>
        <div>{event}</div>
        <div>{days}</div>
        <div>{hours}</div>
        <div>{minutes}</div>
        <div>{seconds}</div>
      </div>
    );
  }
}

export default Countdown;
