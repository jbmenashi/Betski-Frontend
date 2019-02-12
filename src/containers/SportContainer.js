import React, { Component } from 'react';
import {connect} from 'react-redux';
import GameList from '../components/GameList';
import BetInfo from '../components/BetInfo';
import Ticket from '../components/Ticket';
import PickSport from '../components/PickSport'
import MatchupInfo from '../components/MatchupInfo'

const mapStateToProps = (state) => {
  return {
    games: state.game.games,
    filteredGames: state.game.filteredGames,
    currentGameId: state.game.currentGameId,
    currentUserId: state.user.currentUserId,
    isActiveTicket: state.ticket.isActiveTicket,
    currentTicketId: state.ticket.currentTicketId,
    isBetSelected: state.bet.isBetSelected,
    selectedOdds: state.bet.selectedOdds,
    selectedAwayTeam: state.bet.selectedAwayTeam,
    selectedHomeTeam: state.bet.selectedHomeTeam,
    selectedSpread: state.bet.selectedSpread,
    selectedTotal: state.bet.selectedTotal,
    selectedBetType: state.bet.selectedBetType,
    practiceWagerInput: state.bet.practiceWagerInput,
    activeBets: state.bet.activeBets,
    activeMultiplier: state.bet.activeMultiplier,
    betForPost: state.bet.betForPost
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentTicket: (ticketId) => dispatch({type: "SET_CURRENT_TICKET", payload: ticketId}),
    pushActiveBet: (bet) => dispatch({type: "PUSH_BET_TO_ACTIVE_BETS", payload: bet}),
    initActiveMultiplier: (multiplier) => dispatch({type: "INIT_ACTIVE_MULTIPLIER", payload: multiplier}),
    calcActiveMulitplier: (multiplier) => dispatch({type: "CALC_ACTIVE_MULTIPLIER", payload: multiplier}),
    fetchGames: (data) => dispatch({type: "FETCH_GAMES", payload: data})
  }
}

class SportContainer extends Component {
  componentDidMount() {
    fetch('http://localhost:3000/api/v1/games/', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => res.json())
    .then(data => {
      this.props.fetchGames(data)
    })
  }

  addBetToTicket = () => {
    !this.props.isActiveTicket ?
    fetch('http://localhost:3000/api/v1/tickets', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        user_id: this.props.currentUserId,
        wager: 0,
        payout: 0,
        submitted: false,
        closed: false,
        result: 'OPEN'
      })
    })
    .then(res => res.json())
    .then(newTicket => {
      this.props.setCurrentTicket(newTicket.id)
      fetch('http://localhost:3000/api/v1/bets', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
          'Accept':'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          game_id: this.props.currentGameId,
          ticket_id: this.props.currentTicketId,
          multiplier: this.props.selectedOdds > 0 ? ((Math.abs(this.props.selectedOdds) + 100) / 100) : ((Math.abs(this.props.selectedOdds) + 100) / Math.abs(this.props.selectedOdds)),
          team: this.props.betForPost[0],
          variety: this.props.betForPost[1],
          line: this.props.betForPost[2],
          odds: this.props.betForPost[3],
          away: this.props.betForPost[4],
          home: this.props.betForPost[5]
        })
      })
      .then(res => res.json())
      .then(bet => {
        this.props.pushActiveBet(bet)
        this.props.initActiveMultiplier(bet.multiplier)
      })
    }) :
    fetch('http://localhost:3000/api/v1/bets', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
        'Accept':'application/json',
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        game_id: this.props.currentGameId,
        ticket_id: this.props.currentTicketId,
        multiplier: this.props.selectedOdds > 0 ? ((Math.abs(this.props.selectedOdds) + 100) / 100) : ((Math.abs(this.props.selectedOdds) + 100) / Math.abs(this.props.selectedOdds)),
        team: this.props.betForPost[0],
        variety: this.props.betForPost[1],
        line: this.props.betForPost[2],
        odds: this.props.betForPost[3],
        away: this.props.betForPost[4],
        home: this.props.betForPost[5]
      })
    })
    .then(res => res.json())
    .then(bet => {
      this.props.pushActiveBet(bet)
      this.props.calcActiveMulitplier(bet.multiplier)
    })
  }

  render() {
    return (
      <div className="container">
        <PickSport/>
        <div className="row">
          <div className="col-7" id="gamesListColumn">
            {this.props.filteredGames.length > 0 ? <GameList/> : <></>}
          </div>
          <div className="col-5">
            {this.props.isActiveTicket ? <Ticket/> : <></>}
          </div>
        </div>

        <div className="modal fade" id="matchupModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content-matchup">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalCenterTitle">Matchup Info</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {this.props.selectedAwayTeam ? <MatchupInfo/> : <></>}
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="betInfoModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalCenterTitle">Bet Info</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {this.props.isBetSelected ? <BetInfo/> : <></>}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.addBetToTicket}>Add Bet To Ticket</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SportContainer);
