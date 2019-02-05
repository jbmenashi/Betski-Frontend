import React, { Component } from 'react';
import {connect} from 'react-redux';
import GameList from '../components/GameList';
import BetInfo from '../components/BetInfo';
import Ticket from '../components/Ticket';
import PickSport from '../components/PickSport'

const mapStateToProps = (state) => {
  return {
    games: state.games,
    filteredGames: state.filteredGames,
    isBetSelected: state.isBetSelected,
    isActiveTicket: state.isActiveTicket
  }
}

class SportContainer extends Component {
  render() {
    return (

      <div className="container">
        <PickSport/>
        <div className="row">
          <div className="col" id="gamesListColumn">
            {this.props.filteredGames.length > 0 ? <GameList/> : <></>}
          </div>
          <div className="col">
            {this.props.isActiveTicket ? <Ticket/> : <></>}
          </div>
        </div>
        <div class="modal fade" id="betInfoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalCenterTitle">Bet Info</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                {this.props.isBetSelected ? <BetInfo/> : <></>}
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>




      </div>
    );
  }
}

export default connect(mapStateToProps)(SportContainer);
