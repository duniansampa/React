import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import TodoTextInput from './TodoTextInput'

class MainLogin extends Component {
  constructor() {

  }

  render() {
    const { todo, completeTodo, deleteTodo } = this.props

    let element
    let error
   
    return (
      <div>
        <form method="POST" action="/" class="form-login">
          <h3> Entrar no Sistema </h3>
          <p> Preencha os campos necessários para acessar.</p>
            <!-- if messages.erro
            </br>
            <div class="alert alert-danger" >

              each msg in messages.erro
                b= msg
                br
            </div>
            -->
          <div class="form-group">
            <label> E-mail </label>
            <input type="email" class="form-control" placeholder="E-mail" name="email" autofocus required>
          </div>
          <div class="form-group">
            <label> Senha </label>
            <input type="password class="form-control" placeholder="Senha" name="password" required> 
          </div>
          <button type="submit" class="btn btn-primary btn-block"> Entrar </button>
        </form>
      </div>
    )
  }
}

TodoItem.propTypes = {
  /*
  todo: PropTypes.object.isRequired,
  editTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired
  */
}

export default MainLogin
