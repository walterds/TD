class StateManager {
    constructor() {
        this.currentState = 'start';
    }

    getState() {
        return this.currentState;
    }

    setState(state) {
        this.currentState = state;
    }
}

export default StateManager;
