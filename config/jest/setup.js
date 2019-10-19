import 'babel-polyfill';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const matchMediaMock = () => ({
    matches: false,
    addListener: () => {},
    removeListener: () => {},
});

window.matchMedia = window.matchMedia || matchMediaMock;
