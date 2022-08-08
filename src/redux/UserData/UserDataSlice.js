import { createSlice } from "@reduxjs/toolkit";

export const UserDataSlice = createSlice({
  name: "Data",
  initialState: {
    Tab: "CHATROOM",
    privateChats: [],
    mewMessage: [],
    publicChats: [],
  },
  reducers: {
    SetTabValue: (state, action) => {
      state.Tab = action.payload;
    },
    SetnewMessageValue: (state, action) => {
      for (var j = 0; j < state.mewMessage.length; j++) {
        if (state.mewMessage[j].senderName === action.payload) {
          state.mewMessage[j].Data =0;
          break;
        }
      }
    },
    SendPrivateMessage: (state, action) => {
      var payloadData = action.payload;
      for (var i = 0; i < state.privateChats.length; i++) {
        if (state.privateChats[i].senderName === state.Tab) {
          state.privateChats[i].Data.push(payloadData);
          break;
        }
      }
    },
    OnPublicMessageReceived: (state, action) => {
      var payloadData = action.payload;
      switch (payloadData.status) {
        case "JOIN":
          var found = false;
          for (var i = 0; i < state.privateChats.length; i++) {
            if (state.privateChats[i].senderName === payloadData.senderName) {
              found = true;
              break;
            }
          }
          if (!found) {
            state.privateChats.push({
              senderName: payloadData.senderName,
              Data: [],
            });
            state.mewMessage.push({
              senderName: payloadData.senderName,
              Data: 0,
            });
          }
          break;
        case "MESSAGE":
          state.publicChats.push(payloadData);
          break;
        default:
          break;
      }
    },
    OnPrivateMessageReceived: (state, action) => {
      var payloadData = action.payload;
      var found = false;
      for (var i = 0; i < state.privateChats.length; i++) {
        if (state.privateChats[i].senderName === payloadData.senderName) {
          state.privateChats[i].Data.push(payloadData);
          if (state.privateChats[i].senderName !== state.Tab) {
            for (var j = 0; j < state.mewMessage.length; j++) {
              if (state.mewMessage[j].senderName === payloadData.senderName) {
                state.mewMessage[j].Data += 1;
                break;
              }
            }
          }
          found = true;
          break;
        }
      }
      if (!found) {
        state.privateChats.push({
          senderName: payloadData.senderName,
          Data: [payloadData],
        });
        state.mewMessage.push({
          senderName: payloadData.senderName,
          Data: 1,
        });
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  OnPublicMessageReceived,
  OnPrivateMessageReceived,
  SetTabValue,
  SendPrivateMessage,
  SetnewMessageValue,
} = UserDataSlice.actions;

export default UserDataSlice.reducer;
