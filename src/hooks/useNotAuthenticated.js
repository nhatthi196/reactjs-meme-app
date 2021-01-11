import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { parseJwt } from '../helpers';

export function useNotAuthenticated() {
    const history = useHistory();
    const accessToken = useSelector(state => state.Auth.accessToken);

    useEffect(() => {
        try {
            const tokenObj = parseJwt(accessToken)
            const userId = tokenObj.data.user.id;
            if (userId) {
                history.push('/');
            }
        } catch(e) {}

    }, [ accessToken, history ]);

}
