import React, { Component, useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import * as backend from '../../store/startingTest';
import { Icon, IconButton } from '@material-ui/core';

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
    justifyContent: 'space-between',
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

const useComponentVisible = (initialIsVisible) => {
  const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
          setIsComponentVisible(false);
      }
  };

  useEffect(() => {
      document.addEventListener('click', handleClickOutside, true);
      return () => {
          document.removeEventListener('click', handleClickOutside, true);
      };
  });

  return { ref, isComponentVisible, setIsComponentVisible };
};
export class RequirementsComponent extends Component {
  state = {
    requirements: null
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // запит
    let responseRequirements = [
      {
        id: 1,
        text: "asd asd asd red"
      },
      {
        id: 2,
        text: "asd asd asd green"
      },
      {
        id: 3,
        text: "asd yellow, asd green hbjasf qwf asgqgw round oikasgjoas big orange"
      }
    ];

    responseRequirements = responseRequirements.map(req => {
      req.words = req.text.split(/[ ,.-:;]/).filter(word => word.length);
      return req;
    });

    this.setState({requirements: responseRequirements});
  }

  onRequirementClicked = (words) => {
    this.props.viewWords(words);
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        {this.state.requirements?.map((req, i) => 
          <Card className={classes.requirement} key={i} onClick={() => { this.onRequirementClicked(req.words) }}>
            <CardContent className={classes.taskListContent}>
              <Typography >
                { req.text }
              </Typography>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }
}

export const PoorWord = ({classes, word, onClick, color}) => {
  return (
    <>
      <span 
        className={[classes.hoverableWord, 'poor-word'].join(' ')}
        onClick={onClick}
        style={{color: color}}
      >{word}</span>
      <span> </span>
    </>
  )
}

export const PoorWordsField = ({classes, activeRequirementWords, addRemovePoorWord, selectedPoorWords}) => {
  const [popupWord, setPopupWord] = useState(null);
  const [popupCoords, setPopupCoords] = useState(null);
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

  const displayPopUp = (word, event) => {

    setPopupCoords({
      x: event.pageX - 18,
      y: event.pageY - 45    });
    setPopupWord(word);
    setIsComponentVisible(true);
  }

  const getWordColor = (word) => {
    return selectedPoorWords.some(pW => pW === word) ? '#0f0' : 'inherit';
  }

  return (
    <div className="poor-words" ref={ref}>
      {
      activeRequirementWords && activeRequirementWords.length ?
      activeRequirementWords.map((word, i) => 
        <PoorWord 
          classes={classes} 
          word={word} 
          onClick={(event) => displayPopUp(word, event)}
          key={i}
          color={getWordColor(word)}
        />
      ) : 'no requirement selected'}
      {
          isComponentVisible && 
          <Popup
          classes={classes}
          poorWords={selectedPoorWords}
          popupCoords={popupCoords}
          pwClicked={popupWord}
          addOrRemovePw={addRemovePoorWord}
        />
      }
    </div>
  )
}
export const Popup = ({poorWords, pwClicked, addOrRemovePw, popupCoords,classes}) => {

  return (
    <div style={{
      position: 'absolute', 
      left: `${popupCoords.x}px`,
      top: `${popupCoords.y}px`
    }}
    className={classes.popup}>
      {pwClicked}
      <IconButton  onClick={() => addOrRemovePw(pwClicked)} className={classes.button}>
        {~poorWords.findIndex(pW => pW === pwClicked) ? <Icon style={{ color: '#f00' }}>remove</Icon> : <Icon style={{ color: '#0f0' }}>add</Icon> }
      </IconButton>
    </div>
  )
}
export const PoorWords = () => {
  const [activeRequirement, setActiveRequirement] = useState();
  const [selectedPoorWords, setSelectedPoorWords] = useState([]);
  const classes = useStyles();

  const viewWords = (text) => {
    setActiveRequirement(text);
  };

  const addRemovePoorWord = (poorWord) => {
    const index = selectedPoorWords.findIndex(pW => pW === poorWord);
    if(~index){
      selectedPoorWords.splice(index,1)
      setSelectedPoorWords([...selectedPoorWords]);
    } else {
      setSelectedPoorWords([...selectedPoorWords, poorWord]);
    }
  };

  const sendPoorWords = () => {
    console.log(selectedPoorWords)
  }

  return (
    <>
      <Typography className={classes.pos}>Практичне завдання з визначення poor words</Typography>
      <Card className={classes.root}>
        <CardContent className={classes.taskListContent}>
          <div className={classes.flexibleCards}>
            <div className={classes.flexibleCard}>
              <Typography variant={'h6'} className={classes.subCardHeader}>
                Видобуті вимоги 
              </Typography>
              <Card className={[classes.poorCard, classes.requirementCard].join(' ')}>
                <CardContent className={classes.taskListContent}>
                  <RequirementsComponent
                    classes={classes}
                    viewWords={viewWords}
                  />
                </CardContent>
              </Card>
            </div>

            <div className={classes.flexibleCard}>
              <Typography variant={'h6'} className={classes.subCardHeader}>
                Текст вимоги 
              </Typography>
              <Card className={classes.poorCard}>
                <CardContent className={classes.taskListContent}>
                    <PoorWordsField
                      classes={classes}
                      activeRequirementWords={activeRequirement}
                      addRemovePoorWord={addRemovePoorWord}
                      selectedPoorWords={selectedPoorWords}
                    />
                </CardContent>
              </Card>
            </div>

            <div className={classes.flexibleCard}>
              <Typography variant={'h6'} className={classes.subCardHeader}>
                Poor words
              </Typography>
              <Card className={classes.poorCard}>
                <CardContent className={classes.taskListContent}>
                  {
                    selectedPoorWords && selectedPoorWords.length ?
                    selectedPoorWords.map((el,i) => <div key={i}>{el}</div>) :
                    'no poor words selected'
                  }
                </CardContent>
              </Card>
            </div>
          </div>

          <Button
            variant="contained"
            className={classes.startTaskButton}
            onClick={sendPoorWords}
          > 
            Завершити спробу
          </Button>
        </CardContent>
      </Card>
    </>
  );
}

const mapStateToProps = (state) => {
  const { loading, error, questions, questionId, result } = state.startingTest;

  return {
    loading,
    error,
    questions,
    questionId,
    result,
  };
};

export default connect(mapStateToProps)(PoorWords);
