import {
  fetchProfile,
  getProfileDisabled,
  getProfileError,
  getProfileFormData,
  getProfileIsLoading,
  Profile,
} from "@/entities/Profile";
import {
  profileActions,
  profileReducer,
} from "@/entities/Profile/models/slice";
import AddOrRemoveReducer, {
  ReducersList,
} from "@/shared/config/components/AddOrRemoveReducer/AddOrRemoveReducer";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { Section } from "@/shared/ui/Section";
import { ChangeEvent, memo, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const reducersList: ReducersList = {
  profile: profileReducer,
};

function ProfilePage() {
  const profileData = useSelector(getProfileFormData);
  const profileDisabled = useSelector(getProfileDisabled);
  const isLoading = useSelector(getProfileIsLoading);
  const error = useSelector(getProfileError);

  const { id } = useParams<{ id?: string }>();

  const dispatch = useAppDispatch();

  const onChangeInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;

      dispatch(profileActions.setFormData({ [name]: value }));
    },
    [dispatch]
  );

  const onChangeInputSelect = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const { name, value } = event.target;

      dispatch(profileActions.setFormData({ [name]: value }));
    },
    [dispatch]
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProfile(id));
    }
  }, [dispatch, id]);

  return (
    <AddOrRemoveReducer reducersList={reducersList}>
      <Section>
        <Profile
          profileData={profileData}
          profileDisabled={profileDisabled}
          onChangeInput={onChangeInput}
          onChangeInputSelect={onChangeInputSelect}
          isLoading={isLoading}
          error={error}
        />
      </Section>
    </AddOrRemoveReducer>
  );
}

export default memo(ProfilePage);
