import { memo, useCallback } from "react";
import styles from "./ProfileHeader.module.scss";
import { Title } from "@/shared/ui/Title";
import { useTranslation } from "react-i18next";
import { Button } from "@/shared/ui/Button";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { profileActions } from "../../models/slice";
import { updateProfile } from "../../models/services/updateProfile";
import { IProfile } from "../../models/types";
import { useSelector } from "react-redux";
import { getProfileLoadingUpdate } from "../../models/selectors/getProfileLoadingUpdate";

interface IProps {
  profileDisabled: boolean;
  profileData: IProfile | null;
}

function ProfileHeader({ profileDisabled, profileData }: IProps) {
  const { t } = useTranslation("profile");

  const isLoading = useSelector(getProfileLoadingUpdate);
  const dispatch = useAppDispatch();

  const onClickSave = useCallback(() => {
    if (profileData?._id) {
      dispatch(updateProfile(profileData._id));
    }
  }, [dispatch, profileData]);

  const onEdit = useCallback(() => {
    dispatch(profileActions.setDisabled(false));
  }, [dispatch]);

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.setCancelDisabled());
  }, [dispatch]);

  return (
    <div className={styles.profileHeader}>
      <div className={styles.inner}>
        <Title text={t("Profile")} />
        {profileDisabled ? (
          <Button variyant="dashed" onClick={onEdit}>
            {t("Edit")}
          </Button>
        ) : (
          <div className={styles.right}>
            <Button onClick={onClickSave} loading={isLoading}>
              {t("Save")}
            </Button>
            <Button danger onClick={onCancelEdit}>
              {t("Cancel")}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(ProfileHeader);
