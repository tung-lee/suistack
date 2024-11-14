import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BuildState } from '../../types/Buildtype';
import { PublishState } from '../../types/PublishType';

interface InitialState {
  build: BuildState;
  publish: PublishState|null;
}

const initialState: InitialState = {
  build: {
    buildloading:false,
    currentBuildNode:null,
    currentBuildEdge:null,
  },
  publish: null
};

const buildSlice = createSlice({
  name: 'build',
  initialState,
  reducers: {
    // Build actions
    setBuildLoading: (state,action:PayloadAction<boolean>)=>{
      state.build.buildloading=action.payload
    },
    setBuildNode:(state, action:PayloadAction<string|null>)=>{
      state.build.currentBuildNode = action.payload
    },
    setPublishState:(state, action:PayloadAction<PublishState|null>)=>{
      state.publish=action.payload
    }
  }
});

export const {
  setBuildLoading,
  setBuildNode,
  setPublishState
} = buildSlice.actions;

export default buildSlice.reducer;
