import {
    Grid,
    Divider,
} from '@material-ui/core'

import Menu from './src/component/Menu'
import Cart from './src/component/Cart'
import Wallet from './src/component/Wallet'

import Burger from './src/img/Burger.jpg'
import Fries from './src/img/Fries.jpg'
import Nugget from './src/img/Nugget.jpg'
import Cola from './src/img/Cola.jpg'

export class Root extends React.Component {
    constructor(props) {
        super(props);

        this.itemPrice = {
            Burger: 50,
            Fries: 40,
            Nugget: 30,
            Cola: 20, 
        }

        this.state = {
            cartList: [],
            money: 100,
        };
    }

    // TODO-2: add new item to shopping cart
    // Hint: check CartItem for the format of the items in the cart
    handleAddToCart = (itemAmount) => {
        console.log(itemAmount);
        if(itemAmount.Burger > 0){
            let newItem = {
                item: 'Burger',
                amount: itemAmount.Burger
            };
            console.log(newItem);
            this.setState((prevState) => ({
                cartList: [
                    ...prevState.cartList,
                    newItem
                ]
            }))
            console.log(this.state);
        }
        if(itemAmount.Nugget > 0){
            let newItem = {
                item: 'Nugget',
                amount: itemAmount.Nugget
            };
            this.setState((prevState) => ({
                cartList: [
                    ...prevState.cartList,
                    newItem
                ]
            }));
        }
        if(itemAmount.Fries > 0){
            let newItem = {
                item: 'Fries',
                amount: itemAmount.Fries
            };
            this.setState((prevState) => ({
                cartList: [
                    ...prevState.cartList,
                    newItem
                ]
            }));
        }
        if(itemAmount.Cola > 0){
            let newItem = {
                item: 'Cola',
                amount: itemAmount.Cola
            };
            this.setState((prevState) => ({
                cartList: [
                    ...prevState.cartList,
                    newItem
                ]
            }));
        }
        console.log(itemAmount);
        console.log(this.state.cartList);
    }

    // TODO-5: clear shopping cart
    handleClearCart = () => {
        this.setState({cartList: []});
    }

    // TODO-6: remove specific item in shopping cart
    handleDeleteCartItem = (idx) => {
        const newlist = [...this.state.cartList];
        newlist.splice(idx, 1);
        this.setState({
            cartList: newlist
        })
    }

    // To pay money or charge
    handleAdjustMoney = (val) => {
        return new Promise((res, rej) => {
            if (this.state.money + val >= 0) {
                this.setState(state => {
                    return { money: state.money + val }
                });
                res('Payment Successful!');
            }
            else rej('Insufficient Balance!')
        })
    }

    render() {
        return (
            <Grid container direction="row" justifyContent="space-evenly" style={{ height: '100vh' }}>
                <Grid item xs={8}>
                    {/* TODO: pass functions down to children as props */}
                    {/* hint: handleAddToCart */}
                    <Menu
                        itemPrice={this.itemPrice}
                        handleAddToCart = {this.handleAddToCart}
                    />
                </Grid>
                <Divider orientation="vertical"/>
                <Grid item xs={3} container direction="column" justifyContent="flex-start">
                    {/* TODO: pass functions down to children as props */}
                    {/* hint: handleAdjustMoney */}
                    <Wallet
                        money={this.state.money}
                        handleAdjustMoney = {this.handleAdjustMoney}
                    />
                    {/* TODO: pass functions down to children as props */}
                    {/* hint: handleClearCart, handleDeleteCartItem, handleAdjustMoney */}
                    <Cart
                        itemPrice={this.itemPrice}
                        cartList={this.state.cartList}
                        handleClearCart = {this.handleClearCart}
                        handleDelete = {this.handleDeleteCartItem}
                        handleAdjustMoney = {this.handleAdjustMoney}
                        money = {this.state.money}
                    />
                </Grid>
            </Grid>
        );
    }
}

ReactDOM.render(<Root />, document.getElementById('root'));