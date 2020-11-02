import React from 'react';

const AppLoading = props => {
    if (props.error) {
        window.location.reload(true);
        console.log('Error Catched!!!');
    }
    return (
        <div align="center" className="loader-holder">
            <div className="loader" style={{ marginTop: 100 }} />
            <br />
            <p>We are setting up things for you!</p>
        </div>
    );
};

AppLoading.propTypes = {};

export default AppLoading;
