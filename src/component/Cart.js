import {
    withStyles,
    Typography,
    Divider,
    Paper,
    Button,
    Grid,
} from '@material-ui/core'

import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

import CartItem from './CartItem';

const styles = theme => ({
    title: {
        minHeight: 50,
    },
    paper: {
        height: `calc(85vh - 210px)`,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    button: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(2),
    },
    cartItemContainer: {
        height: `calc(85vh - 210px - 60px)`,
        overflowY: 'scroll',
    },
    totalText: {
        fontSize: 32,
        fontFamily: 'Roboto',
        margin: 'auto',
    },
    totalTextContainer: {
        minHeight: 60,
    }
});

class Cart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            total: 0,
        };
    }

    componentDidUpdate(prevProps) {
        console.log(prevProps);
        // TODO-4: calculate total price
        if(prevProps.cartList !== this.props.cartList){
            let totalPrice = 0;
            for(let item of this.props.cartList){
                totalPrice += this.props.itemPrice[item.item] * item.amount;
            }
            this.setState({total: totalPrice})
        }
    }

    // TODO-7: confirm pay money
    handleConfirm = () => {
        this.props.handleAdjustMoney(0 - this.state.total)
        .then((val) => {
            alert(val);
            this.props.handleClearCart();
        }).catch((val) => {
            alert(val);
        })
    }

    render() {
        const { classes, itemPrice, cartList } = this.props;

        return (
            <div>
                <Typography className={classes.title} variant="h4">
                    {"Shopping Cart"}
                </Typography>
                <Divider />
                <Paper className={classes.paper} elevation={3}>
                    <Grid className={classes.cartItemContainer}>
                        {/* TODO-3: use CartItem to show items in cart */}
                        {cartList.map((item, index) => (
                            <CartItem
                                key={index}
                                name={item.item}
                                price={itemPrice[item.item]}
                                amount = {item.amount}
                                idx = {index}
                                handleDelete = {this.props.handleDelete}
//                                han
                            />
                        ))}
                    </Grid>
                    <Divider />
                    <Grid className={classes.totalTextContainer} container>
                        <span className={classes.totalText}>{`Total: $${this.state.total}`}</span>
                    </Grid>
                </Paper>
                <Divider />
                <Grid container justifyContent="flex-end" wrap="nowrap">
                    {/* TODO-7: specify button event handler */}
                    {/* hint: handleConfirm */}
                   <Button
                        className={classes.button}
                        startIcon={<CheckIcon />}
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={this.handleConfirm}
                    >
                        {"Confirm"}
                    </Button>
                    {/* TODO-5: specify button event handler */}
                    {/* hint: handleClearCart */}
                    <Button
                        className={classes.button}
                        startIcon={<ClearIcon />}
                        variant="contained"
                        color="secondary"
                        size="large"
                        onClick={this.props.handleClearCart}
                    >
                        {"Clear"}
                    </Button>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Cart);