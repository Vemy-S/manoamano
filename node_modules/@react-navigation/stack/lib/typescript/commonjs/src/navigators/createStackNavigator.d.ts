import { type DefaultNavigatorOptions, type NavigatorTypeBagBase, type ParamListBase, type StackNavigationState, type StackRouterOptions, type StaticConfig, type TypedNavigator } from '@react-navigation/native';
import type { StackNavigationConfig, StackNavigationEventMap, StackNavigationOptions, StackNavigationProp } from '../types';
type Props = DefaultNavigatorOptions<ParamListBase, string | undefined, StackNavigationState<ParamListBase>, StackNavigationOptions, StackNavigationEventMap, StackNavigationProp<ParamListBase>> & StackRouterOptions & StackNavigationConfig;
declare function StackNavigator({ id, initialRouteName, children, layout, screenListeners, screenOptions, screenLayout, UNSTABLE_getStateForRouteNamesChange, ...rest }: Props): import("react/jsx-runtime").JSX.Element;
export declare function createStackNavigator<const ParamList extends ParamListBase, const NavigatorID extends string | undefined = undefined, const TypeBag extends NavigatorTypeBagBase = {
    ParamList: ParamList;
    NavigatorID: NavigatorID;
    State: StackNavigationState<ParamList>;
    ScreenOptions: StackNavigationOptions;
    EventMap: StackNavigationEventMap;
    NavigationList: {
        [RouteName in keyof ParamList]: StackNavigationProp<ParamList, RouteName, NavigatorID>;
    };
    Navigator: typeof StackNavigator;
}, const Config extends StaticConfig<TypeBag> = StaticConfig<TypeBag>>(config?: Config): TypedNavigator<TypeBag, Config>;
export {};
//# sourceMappingURL=createStackNavigator.d.ts.map