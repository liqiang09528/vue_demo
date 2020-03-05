
import {isExistsByUsername,isExistsEmail,isExistsPhone} from '../api/api'

let usernameValidator=(rule, value, callback)=>{
  var params=new URLSearchParams();
  params.append("username",value);
  isExistsByUsername(params).then(res=>{
    let { status,data,msg } = res;
    callback(msg);
  })
};

let emailValidator=(rule, value, callback)=>{
  var params=new URLSearchParams();
  params.append("email",value);
  isExistsEmail(params).then(res=>{
    let { status,data,msg } = res;
    callback(msg);
  })
};

let phoneValidator=(rule, value, callback)=>{
  var params=new URLSearchParams();
  params.append("phone",value);
  isExistsPhone(params).then(res=>{
    let { status,data,msg } = res;
    callback(msg);
  })
};
export {usernameValidator,emailValidator,phoneValidator};
