import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
  return class withErrorHandler extends Component {
        state = {
            error: null,
            isModalOpen: false,
        }

        componentWillMount = () => {
            this.reqInterceptor = axios.interceptors.response.use(
                (response) => {
                    this.setState({
                        isModalOpen: false,
                    });

                    return response;
                },
                (error) => {
                    this.setState({
                        isModalOpen: true,
                        error
                    });

                    return Promise.reject(error);
                }
            );

            this.respInterceptor = axios.interceptors.request.use(request => {
                this.setState({
                    error: null,
                    isModalOpen: false,
                });
                return request;
            });
        }

        componentWillUnmount = () => {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.respInterceptor);
        }
        

        confirmErrorHandler = () => {
            this.setState({
                isModalOpen: false,
            });
        }
        

        render() {
            return (
                <Aux>
                    <Modal 
                        isShown={this.state.isModalOpen}
                        handleRejectOrder={this.confirmErrorHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            );
        }
    }
}

export default withErrorHandler;
