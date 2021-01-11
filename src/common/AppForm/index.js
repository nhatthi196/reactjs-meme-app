import './AppForm.css';

export default function AppForm({children,onSubmit}) {
function handleLocalSubmit(e)
{
    onSubmit(e);
}
    return (
        <div className="form-login-register">
            <form onSubmit={handleLocalSubmit}>
                {children}
            </form>
        </div>
    );
}