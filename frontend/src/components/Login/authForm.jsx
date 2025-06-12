import InputComp from "../InputComp";
import { SelectedComp } from "../InputComp";
import Button from "../ButtonComp";

export default function LoginForm({
  credential,
  submit,
  failedLogin,
  Loading,
  handlerInput,
}) {
  return (
    <form onSubmit={submit}>
      <div className="InputLogin">
        <InputComp
          type="text"
          id="Username"
          placeholder="e.x Budi or budi@gmail.com"
          className={failedLogin.class}
          value={credential.Username}
          onChange={handlerInput}
          labelText={"Username/Email"}
          classlabel={"Login-label"}
        />
      </div>
      <div className="InputLogin">
        <InputComp
          type="password"
          id="Password"
          placeholder="Enter your password"
          value={credential.Password}
          className={failedLogin.class}
          onChange={handlerInput}
          labelText={"Password"}
          classlabel={"Login-label"}
        />
      </div>
      <Button className="ButtonLogin" text="Login">
        {Loading}
      </Button>
      <p className="error-massage">{failedLogin.message}</p>
    </form>
  );
}

export const RegistForm = ({
  credential,
  submit,
  failedLogin,
  Loading,
  handlerInput,
  optionValue,
}) => {
  return (
    <form onSubmit={submit}>
      <div className="inputRergistWarp">
        <div className="InputLogin">
          <InputComp
            type="text"
            id="Username"
            placeholder="e.x Budi"
            className={failedLogin.class}
            value={credential.Username}
            onChange={handlerInput}
            labelText={"Username"}
            classlabel={"Login-label"}
          />
        </div>
        <div className="InputLogin">
          <InputComp
            type="email"
            id="Email"
            placeholder="e.x budi@gmail.com"
            className={failedLogin.class}
            value={credential.Email}
            onChange={handlerInput}
            labelText={"Email"}
            classlabel={"Login-label"}
          />
        </div>
      </div>
      <div className="inputRergistWarp">
        <div className="InputLogin">
          <InputComp
            type="Text"
            id="Nama"
            placeholder="e.x budiono siregar"
            className={failedLogin.class}
            value={credential.Nama}
            onChange={handlerInput}
            labelText={"Nama"}
            classlabel={"Login-label"}
          />
        </div>
        <div className="InputLogin">
          <InputComp
            type="number"
            id="Nip"
            placeholder="2022112"
            className={failedLogin.class}
            value={credential.Nip}
            onChange={handlerInput}
            labelText={"Nip"}
            classlabel={"Login-label"}
          />
        </div>
      </div>

      <div className="InputLogin">
        <InputComp
          type="password"
          id="Password"
          placeholder="Enter your password"
          value={credential.Password}
          className={failedLogin.class}
          onChange={handlerInput}
          labelText={"Password"}
          classlabel={"Login-label"}
        />
      </div>
      <div className="InputLogin">
        <SelectedComp
          className={failedLogin.class}
          value={credential.Jabatan}
          onChange={handlerInput}
          labelText={"Jabatan"}
          classlabel={"Login-label"}
          id={"Jabatan"}
          optionValue={optionValue}
        />
      </div>
      <Button className="ButtonLogin" text="Sign In">
        {Loading}
      </Button>
      <p className="error-massage" style={{ margin: "1px" }}>
        {failedLogin.message}
      </p>
    </form>
  );
};
