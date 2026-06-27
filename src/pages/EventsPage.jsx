import React from 'react'
import Header from '../components/Layout/Header.jsx'
import EventCard from '../components/route/Events/EventCard';

const EventsPage = ()=>{
    return (
        <div>
            <Header activeHeading={4} />
           
           
            <EventCard active={true} />
        </div>
    )
}

export default EventsPage;