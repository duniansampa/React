import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/Header'
import Footer from '../components/Footer'
import MainSection from '../components/MainSection'
import * as TodoActions from '../actions'


class Login extends Component {

  constructor() {
    super();
    this.state = {
      user: '',
      password: ''
    };
  }
  render() {
    return (
    	<div >
    	  <Header />

        <form method="POST" action="/" class="form-login">
          <h3> Entrar no Sistema </h3>
          <p> Preencha os campos necessários para acessar.</p>
            <br />
            <div class="alert alert-danger" >
            </div>
          <div class="form-group">
            <label> E-mail </label>
            <input type="email" className="form-control" placeholder="E-mail" name="email" autofocus required />
          </div>
          <div class="form-group">
            <label> Senha </label>
            <input type="password" className="form-control" placeholder="Senha" name="password" required /> 
          </div>
          <button type="submit" class="btn btn-primary btn-block"> Entrar </button>
        </form>
    		<Footer />
    	</div>
    )
  }
}

export default Login