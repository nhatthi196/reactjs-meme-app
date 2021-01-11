import './MainTitle.css';
import cls from 'classnames';
import AppButton from '../AppButton';

MainTitle.defaultProps = {
    isShowBtn: false,
    btnProps: {}
}

export default function MainTitle({ 
    children,
    isShowBtn,
    isSearch,
    btnProps: {
        btnText,
        ...restBtnProps
    }
}) {
    return (
        <div className={cls('main-title spacing', {
            'd-flex tcl-jc-between tcl-ais-center': isShowBtn,
            'main-title__search': isSearch
        })}>
            <h2>{ children }</h2>
            { isShowBtn && <AppButton {...restBtnProps} >{btnText}</AppButton> }
        </div>
    )
}
