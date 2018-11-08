import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './SignupBtn.scss';


class SignupBtn extends Component {
    render() {
       return(
           <div className="buttonDiv">
               <Link to="/signup">
                   <button>회원가입</button>
               </Link>
           </div>
       )
   }
}

export default SignupBtn;