import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import { List, ListItem, ListItemText } from '@material-ui/core';
import './styles.module.css';

    const useStyles = makeStyles(theme => ({
        completed: {
            textDecoration: 'line-through',
            color: theme.palette.grey[500],
        },
    }));

    const TodoList = () => {
    const classes = useStyles();
    const [newItem, setNewItem] = useState('');
    const [items, setItems] = useState([]);

    const handleChange = e => {
        setNewItem(e.target.value);
    }

    const addItem = () => {
        if(newItem === "") return; // check if input is empty
        setItems([...items, {text: newItem, completed: false}]);
    }

    const handleSubmit = e => {
        e.preventDefault();
        addItem();
        // reset input
        setNewItem("");
    }

    const toggleComplete = index => {
      let newItems = [...items];
      newItems[index].completed = !newItems[index].completed;
      setItems(newItems);
    }

    const removeCompleted = () => {
        let newItems = items.filter(item => !item.completed);
        setItems(newItems);
    }


    return (
            <div className={classes.container}>
                <h1>My Todo List</h1>
                <form onSubmit={handleSubmit}>
                <TextField 
                    variant="outlined"
                    value={newItem}
                    onChange={handleChange}
                    placeholder="Add a new todo"
                />
                <Button 
                    variant="contained" 
                    color="primary" 
                    type="submit"
                >
                    Add
                </Button>
                </form>

                <List className={classes.mytodos}>
                    {items.map((item, index) => (
                        <ListItem className={item.completed ? classes.completed : null}>
                            <ListItemText primary={item.text} className={item.completed ? classes.completed : null} />
                            <Button onClick={() => toggleComplete(index)}>Mark as {item.completed ? 'Incomplete' : 'Complete'}</Button>
                        </ListItem>
                    ))}
                </List>

                <Button onClick={removeCompleted}>Remove Completed Items</Button>
            </div>
        )
}

export default TodoList;