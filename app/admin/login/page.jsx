import '../../../styles/login.css';
import { Montserrat } from 'next/font/google'; 

const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'] });

export default function AdminLogin() {
    return (
        <div className="admin_login">
            <div className="container">
            <h1 className={montserrat.className} style={{ color: 'white' }}>Вход в аккаунт</h1>
            <div className="form">  {/* Убрали styles.form */}
                <form>
                    <div class="input-box">
                        <label>*Логин</label>
                        <input type="text" placeholder="Введите логин" />
                    </div>
                    <div class="input-box">
                        <label>*Пароль</label>
                        <input type="password" placeholder="Введите пароль" />

                    </div>
                    <button>Войти</button>
                </form>
            </div>
            </div>
        </div>
    );
}
