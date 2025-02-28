import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { 
    TextField, Button, List, ListItem, ListItemText,
    IconButton, Chip, Select, MenuItem, FormControl,
    InputLabel, Stack, Typography, Divider, Box, Container
} from '@mui/material';
import { 
    Delete as DeleteIcon,
    CheckCircle as CheckCircleIcon,
    RadioButtonUnchecked as UncheckedIcon,
    Flag as FlagIcon
} from '@mui/icons-material';
import './styles.module.css';

const StyledListItem = styled(ListItem)(({ theme, completed }) => ({
    ...(completed && {
        backgroundColor: theme.palette.grey[100],
    }),
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '8px',
    '&:hover': {
        backgroundColor: theme.palette.grey[50],
    },
}));

const TodoList = () => {
    const [newItem, setNewItem] = useState('');
    const [items, setItems] = useState([]);
    const [priority, setPriority] = useState('medium');
    const [category, setCategory] = useState('personal');

    const handleChange = e => {
        setNewItem(e.target.value);
    }

    const addItem = () => {
        if(newItem === "") return;
        setItems([...items, {
            text: newItem,
            completed: false,
            priority,
            category,
            createdAt: new Date().toLocaleDateString()
        }]);
    }

    const handleSubmit = e => {
        e.preventDefault();
        addItem();
        setNewItem("");
        setPriority('medium');
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

    const getPriorityColor = (priority) => {
        const colors = {
            high: 'error',
            medium: 'warning',
            low: 'success'
        };
        return colors[priority];
    }

    return (
        <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ width: '100%', textAlign: 'center', py: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    My Todo List
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
                        <TextField 
                            fullWidth
                            variant="outlined"
                            value={newItem}
                            onChange={handleChange}
                            placeholder="Add a new todo"
                        />
                        <FormControl sx={{ minWidth: 120 }}>
                            <InputLabel>Priority</InputLabel>
                            <Select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                label="Priority"
                            >
                                <MenuItem value="high">High</MenuItem>
                                <MenuItem value="medium">Medium</MenuItem>
                                <MenuItem value="low">Low</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ minWidth: 120 }}>
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                label="Category"
                            >
                                <MenuItem value="personal">Personal</MenuItem>
                                <MenuItem value="work">Work</MenuItem>
                                <MenuItem value="shopping">Shopping</MenuItem>
                            </Select>
                        </FormControl>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            type="submit"
                        >
                            Add
                        </Button>
                    </Stack>
                </form>

                <List className="mytodos" sx={{ textAlign: 'left' }}>
                    {items.map((item, index) => (
                        <StyledListItem key={index} completed={item.completed ? 1 : 0}>
                            <IconButton onClick={() => toggleComplete(index)} sx={{ mr: 1 }}>
                                {item.completed ? 
                                    <CheckCircleIcon color="success" /> : 
                                    <UncheckedIcon />
                                }
                            </IconButton>
                            <ListItemText 
                                primary={item.text}
                                secondary={
                                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                                        <Chip 
                                            size="small"
                                            icon={<FlagIcon />}
                                            label={item.priority}
                                            color={getPriorityColor(item.priority)}
                                        />
                                        <Chip 
                                            size="small"
                                            label={item.category}
                                        />
                                        <Typography variant="caption" color="text.secondary">
                                            Added: {item.createdAt}
                                        </Typography>
                                    </Stack>
                                }
                                sx={item.completed ? {textDecoration: 'line-through', color: 'grey.500'} : {}}
                            />
                            <IconButton onClick={() => {
                                const newItems = [...items];
                                newItems.splice(index, 1);
                                setItems(newItems);
                            }}>
                                <DeleteIcon color="error" />
                            </IconButton>
                        </StyledListItem>
                    ))}
                </List>

                {items.some(item => item.completed) && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                        <Button 
                            variant="outlined"
                            color="error"
                            onClick={removeCompleted}
                            startIcon={<DeleteIcon />}
                        >
                            Clear Completed
                        </Button>
                    </Box>
                )}
            </Box>
        </Container>
    );
}

export default TodoList;