import {
  createStateHook,
  createActionsHook,
  createEffectsHook,
  createReactionHook,
} from "overmind-react";
import { merge, namespaced } from "overmind/config";
import { state } from "./state";
import * as actions from "./actions";
import * as user from "./namespaces/user";
import * as alert from "./namespaces/alert";
import * as appointment from "./namespaces/appointment";
import * as effects from "./effects";

export const config = merge(
  {
    state,
    actions,
    effects,
  },
  namespaced({
    user,
    alert,
    appointment,
  })
);

export const useAppState = createStateHook();
export const useActions = createActionsHook();
export const useEffects = createEffectsHook();
export const useReaction = createReactionHook();
