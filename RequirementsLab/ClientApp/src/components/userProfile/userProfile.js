import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Icon, IconButton } from '@material-ui/core';
import Result from '../result/Result';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    borderRadius: '20px',
    backgroundColor: 'rgb(196, 196, 196)',
  },
  requirement: {
    backgroundColor: '#ccc',
    borderRadius: '20px',
    marginBottom: '12px',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#aaa'
    }
  },
  taskListContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflowY: 'auto',
  },
  flexibleCards: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    overflowY: 'auto',
    width: '100%',
    padding: '10px 0',
    marginBottom: '12px'
  },
  flexibleCard: {
    '&:not(:first-of-type)': {
      marginLeft: '16px'
    }
  },
  poorCard: {
    backgroundColor: '#fff',
    borderRadius: '20px',
    minWidth: '234px',
    maxWidth: '400px',
  },
  requirementCard: {
    maxWidth: '400px',
  },
  subCardHeader: {
    fontFamily: 'Roboto',
    fontSize: '14px',
    lineHeight: '15px',
    marginBottom: '6px'
  },
  startTaskButton: {
    borderRadius: '20px',
    backgroundColor: 'rgb(76, 79, 107)',
    color: 'white',
    alignSelf: 'center',
    '&:hover, &:focus': {
      backgroundColor: 'rgb(50, 50, 80)',
    },
  },
  hoverableWord: {
    padding: '0 2px',
    borderRadius: '2px',
    '&:hover': {
      backgroundColor: '#0002',
      cursor: 'pointer'
    },
  },
  popup: {
    overflowY:'visible',
    padding: '4px',
    border: '2px solid #000',
    borderRadius: '5px',
    backgroundColor: '#fff',
    '&::before': {
      content: `''`,
      position: 'absolute',
      bottom: '-20px',
      left: '7px',
      borderColor: '#000 transparent transparent transparent',
      borderWidth: '9px',
      borderStyle: 'solid',
    },
    '&::after': {
      content: `''`,
      position: 'absolute',
      bottom: '-18px',
      left: '7px',
      borderColor: '#fff transparent transparent transparent',
      borderWidth: '9px',
      borderStyle: 'solid',
    }
  },
  button: {
    width: '20px',
    height: '20px',
    '&:hover, &:focus': {
      outline: 'none'
    },
  }
});

export const UserProfile = ({taskId}) => {
  const [timeSpent, setTimeSpent] = useState(Date.now());
  const [result, setResult] = useState();
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    (async () => {
        const response = await fetch(`Profile/statistics`);
        const data = await response.json();
        console.log(data);
      //   setRequirements(responseRequirements);
      // } else {
      //   history.push('../tasks');
      // }
    })()
  }, []);

  return (
    result ? (
      <Result
        classes={classes}
        level={result.grade}
        levelName={result.title}
        time={timeSpent}
        title={null}
      />):(
      <>
        <Typography className={classes.pos}>Профіль користувача {'"Каво"' + ' ->'} <b>Модуль аналізу вимог до ПЗ</b></Typography>
        <Card className={classes.root}>
          <CardContent className={classes.taskListContent}>
            <div className={classes.flexibleCards}>
              <div className={classes.flexibleCard}>
                <Card className={[classes.poorCard, classes.requirementCard].join(' ')}>
                  <CardContent className={classes.taskListContent}>
                    Проміжний
                  </CardContent>
                </Card>
              </div>

              <div className={classes.flexibleCard}>
                <Card className={classes.poorCard}>
                  <CardContent className={classes.taskListContent}>
                      Результат
                  </CardContent>
                </Card>
              </div>

            </div>

            <Button
              variant="contained"
              className={classes.startTaskButton}
              onClick={()=>history.push('../')}
            > 
              Ок
            </Button>
          </CardContent>
        </Card>
      </>
    )
  );
}

const mapStateToProps = (state) => {
  const {
    taskId,
  } = state.taskList;
  return {
    taskId
  };
};

export default connect(mapStateToProps)(UserProfile);
